class StorageWrapper {
  async get(key: string): Promise<any> {
    let storedValue = await GM.getValue(key);

    if (typeof storedValue === "string") {
      try {
        storedValue = JSON.parse(storedValue);
      } catch (e) {}
    }

    return storedValue;
  }

  async set(key: string, value: any): Promise<void> {
    const serializedValue = JSON.stringify(value);
    await GM.setValue(key, serializedValue);
  }

  async delete(key: string): Promise<void> {
    await GM.deleteValue(key);
  }
}

export default new StorageWrapper();
