const categories = [];
const activeCategories = [];
let allowFilters = false;
const enableFilterCheckBox = document.querySelector("#filter-favorites");
const checkBoxes = document.querySelectorAll(".filter-input");
const menuItems = document.querySelectorAll(".menu-item");

const listenGlobalFilterCheck = () => {
  enableFilterCheckBox.addEventListener("change", () => {
    allowFilters = enableFilterCheckBox.checked;
    filterUI();
  });
};

const fetchCategories = () => {
  checkBoxes.forEach((box) => categories.push(box.dataset.filter));
};

const filterUI = () => {
  const items = document.querySelectorAll(".menu-item").forEach((item) => {
    item.style.display = "grid";
    const favorite = item.dataset.favorite === "true";

    if (!activeCategories.includes(item.dataset.category)) {
      item.style.display = "none";
    }

    if (favorite && allowFilters) {
      item.style.display = "grid";
      item.classList.add("selected")
    }else if(allowFilters && !favorite){
      item.style.display = "none";
      item.classList.remove("selected");
    }
  });
};

const setFilterListeners = () => {
  checkBoxes.forEach((box) =>
    box.addEventListener("change", () => {
      const filter = box.dataset.filter;

      if (box.checked) {
        activeCategories.push(filter);
      } else {
        activeCategories.splice(activeCategories.indexOf(filter), 1);
      }

      filterUI();
    })
  );
};

const setFavoriteListeners = () => {
  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      const favorite = menuItem.dataset.favorite === "true";
      menuItem.dataset.favorite = !favorite
      filterUI();
    });
  });
};

const main = () => {
  fetchCategories();
  listenGlobalFilterCheck();
  setFilterListeners();
  setFavoriteListeners();
  filterUI();
};

main();
