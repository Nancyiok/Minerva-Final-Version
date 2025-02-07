const headerNavigationMenuItemContainer = document.querySelector(".header-navigation__menu-item-container");
const headerNavigationMenuItemDropdown = document.querySelector(".header-navigation__menu-item-dropdown");
const headerNavigationMenuArrow = document.querySelector(".header-navigation__menu-arrow");
const headerLine = document.querySelector(".header-navigation__decoration-line");

headerNavigationMenuItemContainer.addEventListener("click", () => {
    headerNavigationMenuItemDropdown.classList.toggle("active");
    headerNavigationMenuArrow.classList.toggle("active");
});

const headerNavigationMenuBurgerIcon = document.querySelector(".header-navigation__menu-burger");
const headerNavigationMainDropMenu = document.querySelector(".header-navigation__main-drop-menu");

headerNavigationMenuBurgerIcon.addEventListener("click", () => {
    headerNavigationMainDropMenu.classList.toggle("active");
    headerNavigationMenuBurgerIcon.classList.toggle("active");

    if (headerNavigationMainDropMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    }
});


const headerNavigationMenuItemContainerComputer = document.querySelector(".header-navigation__menu-item-container-computer");
const headerNavigationMenuItemDropdownComputer = document.querySelector(".header-navigation__menu-item-dropdown-computer");
const headerComputerArrow = document.querySelector(".header-navigation__menu-arrow-computer");

headerNavigationMenuItemContainerComputer.addEventListener("click", () => {
    const isActive = headerNavigationMenuItemDropdownComputer.classList.toggle("active");
    headerComputerArrow.classList.toggle("active");
});

const userAccountButton = document.querySelector(".user-account-button");
const userAccountComputer = document.querySelector(".header-navigation__menu-item-dropdown-user-account-computer");
userAccountButton.addEventListener("click", () => {
    userAccountComputer.classList.toggle("active");
});

// .header - navigation__menu - item - dropdown - user - acount - computer