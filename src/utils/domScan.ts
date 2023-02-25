import { Currency } from "../interfaces";
import { constants } from "../constants";

function getTextNodesByPattern(node: Node, pattern: RegExp) {
  const acceptNode = (node: Node): number => {
    // Check if the node's parent is a SCRIPT or STYLE tag
    if (
      node.parentNode &&
      (node.parentNode.nodeName === "SCRIPT" ||
        node.parentNode.nodeName === "STYLE")
    ) {
      // Do not scan any of the node's children
      return NodeFilter.FILTER_REJECT;
    }

    if (pattern.test(node.nodeValue)) {
      return NodeFilter.FILTER_ACCEPT;
    } else {
      return NodeFilter.FILTER_SKIP;
    }
  };

  const nodeList: Array<Node> = [];
  let currentNode: Node;

  const walk = document.createTreeWalker(
    node,
    NodeFilter.SHOW_TEXT,
    acceptNode
  );
  while ((currentNode = walk.nextNode())) nodeList.push(currentNode);

  return nodeList;
}

function updatePriceTags(
  mutation: MutationRecord,
  priceNodes: Node[],
  currentCurrency: Currency
) {
  let _priceNodes: Node[] = [];
  if (!currentCurrency) {
    // First pass to detect used currency
    // Find the first node which matches any currency pattern and use it as reference
    for (const currency of constants.CURRENCIES) {
      _priceNodes = getTextNodesByPattern(mutation.target, currency.pattern);
      if (_priceNodes.length > 0) {
        currentCurrency = currency;
        break;
      }
    }
    // If no currency was detected, then ignore current textNodes and wait for new ones
    if (!currentCurrency) {
      return;
    }
  } else {
    // If currency was detect in a previous pass, then use it to find nodes
    // If it was detected in current pass, then this branch is not executed
    _priceNodes = getTextNodesByPattern(
      mutation.target,
      currentCurrency.pattern
    );
  }

  // Filter out nodes which were already added using isExistingNode
  const newPriceNodes = _priceNodes.filter(
    (_priceNode: Node) =>
      !priceNodes.some((priceNode) => priceNode.isEqualNode(_priceNode))
  );

  if (newPriceNodes.length > 0) {
    // Queue all price nodes to be converted
    priceNodes.push(...newPriceNodes);
    // Send a custom event to trigger the conversion of queued nodes
    document.dispatchEvent(
      new CustomEvent("priceNodesAdded", { detail: currentCurrency })
    );
  }
}

export async function scanDOM(priceNodes: Node[]) {
  let currentCurrency: Currency;
  let triggerUpdate: boolean = false;

  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((mutation: MutationRecord) => {
      if (mutation.type == "childList") {
        if (mutation.target instanceof HTMLElement) {
          if (mutation.target.id === "global_action_menu") {
            document.dispatchEvent(
              new CustomEvent("globalActionMenuFound", {
                detail: {
                  target: mutation.target,
                  observer: observer,
                },
              })
            );
          }
        }
        // Check if mutation has at least one text node which matches any currency pattern
        for (const currency of constants.CURRENCIES) {
          if (currency.pattern.test(mutation.target.textContent))
            triggerUpdate = true;
        }
        if (triggerUpdate) {
          updatePriceTags(mutation, priceNodes, currentCurrency);
          triggerUpdate = false;
        }
      }
    });
  });

  observer.observe(document, constants.OBSERVER_CONFIG);
}
