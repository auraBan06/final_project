mutation {
  removeLogo (id: "5e937f5ea7ac2497a2cb8efb") {
    _id
  }
}




{
  logo(id: "5e937f5ea7ac2497a2cb8efb") {
    _id
    text
    borderColor
    borderWidth
    borderRadius
    backgroundColor
    margin
    padding
    fontSize
  }
}


mutation {
  addLogo (
    text: "Debugging Enterprises",
    color: "#ffd700",
    fontSize: 44,
    borderColor: "#ff33dd",
    borderWidth: 30,
    borderRadius: 20,
    backgroundColor: "#ff4500",
    padding: 30,
    margin: 20,
    
  ) {
    lastUpdate
  }
}




mutation {
  updateLogo (
    id: "5e937f5ea7ac2497a2cb8efb",
    text: "Google",
    color: "#f0ffff",
    fontSize: 32,
    backgroundColor: "#7fffd4",
    borderColor: "#ffeedd",
    borderWidth: 50,
    borderRadius: 20,
    margin: 10,
    padding: 20,
    
  ) {
    lastUpdate
  }
}
