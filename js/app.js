// Public methods

// App Controller

const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors()

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit)

    // Disable submit on enter
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault()
        return false
      }
    })

    // Edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick)

    // Update item event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit)

    // Delete item event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit)

    // Back button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState)

    // Clear all event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick)
  }

  // Add item submit

  const itemAddSubmit = function (e) {
    // Get form input from UI Controller

    const input = UICtrl.getItemInput()

    // Check for name and calories
    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories)

      // Add item to UI list
      UICtrl.addListItem(newItem)

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories()

      // Add total calories to the UI
      UICtrl.showTotalCalories(totalCalories)

      // Store in localStorage
      StorageCtrl.storeItem(newItem)

      // Clear fields
      UICtrl.clearInput()
    }

    e.preventDefault()
  }

  // Click edit item (event delegation)
  const itemEditClick = function (e) {
    if (e.target.classList.contains("edit-item")) {
      // Get list item id
      const listId = e.target.parentNode.parentNode.id

      // Break into an array
      const listIdArr = listId.split("-")

      // Get the actual id
      const id = parseInt(listIdArr[1])

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id)

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit)

      // Add item to form
      UICtrl.addItemToForm()
    }

    e.preventDefault()
  }

  // Update item submit

  const itemUpdateSubmit = function (e) {
    // Get item input
    const input = UICtrl.getItemInput()

    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories)

    // Update UI
    UICtrl.updateListItem(updatedItem)

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories()

    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories)

    UICtrl.clearEditState()

    // Update localStorage
    StorageCtrl.updateItemStorage(updatedItem)

    e.preventDefault()
  }

  // Delete Button
  const itemDeleteSubmit = function (e) {
    //  Get current item
    const currentItem = ItemCtrl.getCurrentItem()

    //  Delete from data structure
    ItemCtrl.deleteItem(currentItem.id)

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id)

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories()

    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories)

    // Delete from localStorage

    StorageCtrl.deleteItemFromStorage(currentItem.id)

    UICtrl.clearEditState()

    e.preventDefault()
  }

  // Clear Items Event

  const clearAllItemsClick = function () {
    // Delete all items from data structure
    ItemCtrl.clearAllItems()

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories()

    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories)

    // Remove
    UICtrl.removeItems()

    // Clear from localStorage
    StorageCtrl.clearItemsFromStorage()

    // Hide UL
    UICtrl.hideList()
  }

  // Public methods
  return {
    init: function () {
      // Clear edit state / set initial state
      UICtrl.clearEditState()
      // Fetch items from data structure
      const items = ItemCtrl.getItems()

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList()
      } else {
        // Populate list with items
        UICtrl.populateItemList(items)
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories()

      // Add total calories to the UI
      UICtrl.showTotalCalories(totalCalories)

      // Load event listeners
      loadEventListeners()
    },
  }
})(ItemCtrl, StorageCtrl, UICtrl)

// Initialize App
App.init()
