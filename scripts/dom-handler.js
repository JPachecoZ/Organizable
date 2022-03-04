const DOMHandler = (function () {

  return {
    module: null,
    load(location, module) {
      const parent = document.querySelector(location);
      if (!parent) throw new Error("Parent container not found");
      this.module = module;
      parent.innerHTML = module;
      module.addListeners();
    },
    reload() {
      this.load(this.module);
    }
  };
})();

export default DOMHandler