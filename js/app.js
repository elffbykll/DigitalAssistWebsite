document.addEventListener("DOMContentLoaded", function () {
  const keywords = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
    "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır",
    "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri", "Hatay",
    "Isparta", "İçel (Mersin)", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
    "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
    "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli",
    "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak",
    "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce",
  ];
  const inputField = document.getElementById("autocomplete-input");
  const autocompleteContainer = document.getElementById("autocomplete-container");
  let selectedKeywordIndex = 0;

  inputField.addEventListener("input", function (event) {
    const inputValue = this.value.trim().toLowerCase();
    selectedKeywordIndex = 0;

    if (inputValue === "") {
      autocompleteContainer.innerHTML = "";
      return;
    }

    autocompleteContainer.innerHTML = "";

    const matchingKeywords = keywords.filter((keyword) =>
      keyword.toLowerCase().startsWith(inputValue)
    );

    matchingKeywords.forEach((keyword) => {
      const item = document.createElement("div");
      item.classList.add("autocomplete-item");
      item.textContent = keyword;
      item.addEventListener("click", function () {
        inputField.value = keyword;
        autocompleteContainer.innerHTML = "";
      });
      autocompleteContainer.appendChild(item);
    });
    highlightSelectedItem();
  });

  inputField.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown") {
      selectedKeywordIndex = Math.min(
        selectedKeywordIndex + 1,
        autocompleteContainer.children.length - 1
      );
      highlightSelectedItem();
    } else if (event.key === "ArrowUp") {
      selectedKeywordIndex = Math.max(selectedKeywordIndex - 1, -1);
      highlightSelectedItem();
    } else if (event.key === "Enter") {
      if (selectedKeywordIndex >= 0) {
        inputField.value =
          autocompleteContainer.children[selectedKeywordIndex].textContent;
        autocompleteContainer.innerHTML = "";
      }
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !autocompleteContainer.contains(event.target) &&
      event.target !== inputField
    ) {
      autocompleteContainer.innerHTML = "";
    }
  });

  function highlightSelectedItem() {
    Array.from(autocompleteContainer.children).forEach((item, index) => {
      if (index === selectedKeywordIndex) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    });
  }

  autocompleteContainer.addEventListener("mouseover", function (event) {
    const hoveredItem = event.target;
    if (hoveredItem.classList.contains("autocomplete-item")) {
      Array.from(autocompleteContainer.children).forEach((item) => {
        item.classList.remove("selected");
      });
      hoveredItem.classList.add("selected");
    }
  });

  autocompleteContainer.addEventListener("mouseout", function (event) {
    const hoveredItem = event.target;
    if (hoveredItem.classList.contains("autocomplete-item")) {
      hoveredItem.classList.remove("selected");
    }
    selectedKeywordIndex = -1;
  });
});
