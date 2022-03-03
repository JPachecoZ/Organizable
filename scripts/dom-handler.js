const DOMHandler = (function (parentSelector) {
  const parent = document.querySelector(parentSelector);

  if (!parent) throw new Error("Parent container not found");

  return {
    module: null,
    load(module) {
      this.module = module;
      parent.innerHTML = module;
      module.addListeners();
    },
    reload() {
      this.load(this.module);
    }
  };
})("#root");

export default DOMHandler