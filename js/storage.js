// Storage Controller
const StorageCtrl = (function () {
  // Public Methods
  return {
    storeItem: function (item) {
      let items
      // Check if any items in localStorage
      if (localStorage.getItem("items") === null) {
        items = []
        items.push(item)

        // Set localStorage
        localStorage.setItem("items", JSON.stringify(items))
      } else {
        // Get what is already in localStorage
        items = JSON.parse(localStorage.getItem("items"))

        // Push new item
        items.push(item)

        // Re set localStorage
        localStorage.setItem("items", JSON.stringify(items))
      }
    },
    getItemsFromStorage: function () {
      let items
      if (localStorage.getItem("items") === null) {
        items = []
      } else {
        items = JSON.parse(localStorage.getItem("items"))
      }
      return items
    },
    updateItemStorage: function (updatedItem) {
      let items = JSON.parse(localStorage.getItem("items"))
      items.forEach(function (item, index) {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem)
        }
      })
      // Set localStorage
      localStorage.setItem("items", JSON.stringify(items))
    },
    deleteItemFromStorage: function (id) {
      let items = JSON.parse(localStorage.getItem("items"))
      items.forEach(function (item, index) {
        if (id === item.id) {
          items.splice(index, 1)
        }
      })
      // Set localStorage
      localStorage.setItem("items", JSON.stringify(items))
    },
    clearItemsFromStorage: function () {
      localStorage.removeItem("items")
    },
  }
})()
