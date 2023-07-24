  // ? http
  const ListProduct = ({ limit, skip, search }) => {
      return fetch(`https://dummyjson.com/products/search?q=${search}&skip=${skip}&limit=${limit}`)
    }
    
  const FindProductById = ({ id }) => {
    return fetch("https://dummyjson.com/products/" + id)
  }
  
  // ? const
  const constData = {
    limit: 10
  }
  // debounce
  let timeoutId = null
  
  // ? utils / helper
  const skipDataPagination = (page) => {
    return (page - 1) * constData.limit
  }
  
  // ? state
  let state = {
    hash: location.hash,
    home: {
      inputValue: localStorage.getItem("inputValue") ?? "",
      products: [],
      isLoading: false,
      loadingHomePage: false,
      errorMessage: "",
      page: 1,
      totalPage: 1,
      totalData: 0
    },
    favorite: {
      favoriteIds: JSON.parse(localStorage.getItem("favoriteIds")) ?? [],
      isLoading: false,
      products: [],
      errorMessage: "",
    },
    detail: {
      productId: null,
      product: null,
      isLoading: false,
      errorMessage: "",
    }
  }
  
  const onChangeState = (prevEntityState, nextEntityState) => {
    // Hash
    if (prevEntityState.hash != nextEntityState.hash) {
      if (nextEntityState.hash == "#favorite") {
        setState({ favorite: { ...state.favorite, products: [], isLoading: true }})
      } else {
        setState({ favorite: { ...state.favorite, products: [] }})
      }

      if (nextEntityState.hash == "#home") {
        setState({ home: { ...state.home, products: [], inputValue: "", page: 1, isLoading: true }})
      } else {
        setState({ home: { ...state.home, products: [], inputValue: "" }})
      }

      setState({ detail: { ...state.detail, product: null, productId: null }})
  
      history.pushState(null, "", nextEntityState.hash)
    }
  // Home
    if (prevEntityState.home.inputValue != nextEntityState.home.inputValue) {
      localStorage.setItem("inputValue", nextEntityState.home.inputValue)
      setState({ home: { ...state.home, loadingHomePage: true }})
      
      if (timeoutId != null) {
        clearTimeout(timeoutId)
      }
  
      timeoutId = setTimeout(() => {
        setState({ home: { ...state.home, loadingHomePage: false, isLoading: true, page: 1 }})
      }, 500)
    }
  
    if (prevEntityState.home.page != nextEntityState.home.page) {
      setState({ home: { ...state.home, isLoading: true }})
    }
  
    if (prevEntityState.home.totalData != nextEntityState.home.totalData) {
      const totalPage = Math.floor(state.home.totalData / constData.limit)
      setState({ home: { ...state.home, totalPage }})
    }

    if (prevEntityState.home.isLoading === false && nextEntityState.home.isLoading === true) {
      const skip = skipDataPagination(nextEntityState.home.page)
      ListProduct({ limit: constData.limit, skip, search: state.home.inputValue })
        .then((res) => res.json())
        .then((data) => {
          setState({ home: { ...state.home, isLoading: false, products: data.products, errorMessage: "", totalData: data.total }})
        })
        .catch((err) =>
          setState({ home: { ...state.home, isLoading: false, products: [], errorMessage: err.message, totalData: 0 }})
        )
    }
  
  // favorite
    if (prevEntityState.favorite.favoriteIds != nextEntityState.favorite.favoriteIds) {
      localStorage.setItem("favoriteIds", JSON.stringify(nextEntityState.favorite.favoriteIds))
    }
  
    if (prevEntityState.favorite.isLoading === false && nextEntityState.favorite.isLoading === true) {
      const fetchPromises = state.favorite.favoriteIds.map(id => FindProductById({ id })
        .then(res => res.json())
        .catch((err) => {
          setState({ favorite: { ...state.favorite, isLoading: false, products: [], errorMessage: err.message }})
        })
      )
      Promise.all(fetchPromises)
        .then(res => {
          setState({ favorite: { ...state.favorite, products: res, isLoading: false, errorMessage: "" }})
        })  
    }
  
  // detail
    if (prevEntityState.detail.isLoading === false && nextEntityState.detail.isLoading === true) {
      if (state.detail.productId) {
        FindProductById({ id: state.detail.productId })
          .then((res) => res.json())
          .then((product) => {
            setState({ detail: { ...state.detail, isLoading: false, product, errorMessage: "" }})
          })
          .catch(err => setState({ detail: { ...state.detail, isLoading: false, product: null, errorMessage: err.message }}))
      }
    }
  
    if (prevEntityState.detail.productId != nextEntityState.detail.productId) {
      const url = new URL(window.location.href)
      if (nextEntityState.detail.productId == null) {
        url.search = ''
        window.history.pushState(null, "", url)
      } else {
        const params = new URLSearchParams()
        params.set("id", nextEntityState.detail.productId)
        url.search = params.toString()
        window.history.pushState(null, "", url)
        setState({ detail: { ...state.detail, isLoading: true }})
      }
    }
  }
  
  
  const setState = (newState) => {
    const prevState = { ...state }
    const nextState = { ...prevState, ...newState }
    state = nextState
    render()
    onChangeState(prevState, nextState)
  }
  
  // ? component
  const Link = (props) => {
    const link = document.createElement('a')
    link.href = props.href
    link.textContent = props.label
    link.onclick = (event) => {
      event.preventDefault()
      const url = new URL(event.target.href)
      setState({ hash: url.hash })
      props.onClick && props.onClick()
    }
  
    return link
  }
  
  const NavBar = () => {
    const linkHome = Link({ href: "#home", label: "Home" })
    const linkFavorite = Link({ href: "#favorite", label: "Favorite" })
  
    const navbar = document.createElement("div")
    navbar.style.display = "flex"
    navbar.style.gap = "10px"
    navbar.append(linkHome)
    navbar.append(linkFavorite)
  
    return navbar
  }
  
  const ProductItem = (props) => {
    const div = document.createElement("div")
    div.style.display = "flex"
    div.style.flexDirection = "column"
    div.style.justifyContent = "center"
    div.style.alignItems = "center"
  
    const image = document.createElement("img")
    image.src = props.thumbnail
    image.style.width = "80px"
    image.style.height = "100px"
  
    const title = document.createElement("h5")
    title.textContent = props.title
  
    const descriptionText = document.createElement("p")
    descriptionText.textContent = props.description
  
    const isFavorite = state.favorite.favoriteIds.some(id => id == props.id)
    const buttonFavorite = document.createElement("button")
    buttonFavorite.textContent = isFavorite ? "Delete from favorite" : "Add to favorite"
    buttonFavorite.onclick = () => {
      if (isFavorite) {
        const newData = state.favorite.favoriteIds.filter((id) => id != props.id)
        setState({ favorite: { ...state.favorite, favoriteIds: newData }})
  
        if (state.hash == "#favorite") {
          setState({ favorite: { ...state.favorite, isLoading: true }})
        }
      } else {
        setState({ favorite: { ...state.favorite, favoriteIds: [...state.favorite.favoriteIds, props.id] }})
      }
    }
  
    const linkDetail = Link({ 
      href: "#detail", 
      label: "See Detail " + props.title,
      onClick: () => {
        setState({ detail: { ...state.detail, productId: props.id }})
      }
    })
  
    div.append(image)
    div.append(title)
    div.append(buttonFavorite)
    div.append(linkDetail)
    div.append(descriptionText)
  
    return div
  }
  
  const DetailProduct = (props) => {
    const div = document.createElement("div")
    div.style.display = "flex"
    div.style.flexDirection = "column"
    div.style.justifyContent = "center"
    div.style.alignItems = "center"
  
    const image = document.createElement("img")
    image.src = props.thumbnail
    image.style.width = "80px"
    image.style.height = "100px"
  
    const title = document.createElement("h5")
    title.textContent = props.title
  
    const categoryText = document.createElement("p")
    categoryText.textContent = "Category: " + props.category
  
    const brandText = document.createElement("p")
    brandText.textContent = "Brand: " + props.brand
  
    const priceText = document.createElement("p")
    priceText.textContent = "Price: $" + props.price
  
    const descriptionText = document.createElement("p")
    descriptionText.textContent = props.description
  
    div.append(image)
    div.append(title)
    div.append(categoryText)
    div.append(brandText)
    div.append(priceText)
    div.append(descriptionText)
  
    return div
  }
  
  const SearchProduct = () => {
    const div = document.createElement("div")
    // input comp
    const input = document.createElement("input")
    input.id = "input"
    input.value = state.home.inputValue
    input.placeholder = "enter product name"
    input.oninput = (event) => {
      setState({ home: { ...state.home, inputValue: event.target.value }})
    }
  
    div.append(input)
  
    return div
  }
  
  const Pagination = () => {
    const div = document.createElement("div")
    div.style.display = "flex"
    div.style.flexDirection = "row"
    div.style.gap = "5px"
    div.style.justifyContent = "center"
    div.style.alignItems = "center"
  
    const page = []
    
    for(let i = 1; i <= state.home.totalPage; i++) {
      const button = document.createElement("button")
      if (i == state.home.page) {
        button.style.backgroundColor = "red"
      }
      button.textContent = i
      button.onclick = () => {
        setState({ home: { ...state.home, page: i, isLoading: true }})
      }
      page.push(button)
    }
  
    div.append(...page)
  
    return div
  }
  
  // ? screen
  const ProductList = (entity) => {
    const pagination = Pagination()
    const productItem = state[entity].products.map(product => ProductItem(product))
  
    const loadingText = document.createElement("p")
    loadingText.textContent = "Loading Products..."
  
    const emptyText = document.createElement("p")
    emptyText.textContent = "Product Empty"
  
    const errorText = document.createElement("p")
    errorText.textContent = state[entity].errorMessage
  
    const div = document.createElement("div")
  
    if (state[entity].isLoading || state.home.loadingHomePage) {
      div.append(loadingText)
    } else if (state[entity].errorMessage != "") {
      div.append(errorText)
    } else if (state[entity].products.length == 0) {
      div.append(emptyText)
    } else {
      div.append(...productItem)
      if (state.hash == "#home") {
        div.append(pagination)
      }
    }
  
    return div
  }
  
  // ? content
  const HomeContent = () => {
    const div = document.createElement("div")
    const title = document.createElement("h5")
    title.textContent = "List Product"
    // product list
    const productList = ProductList("home")
    const searchProduct = SearchProduct()
    div.append(searchProduct)
    div.append(title)
    div.append(productList)
  
    return div
  }
  
  const FavoriteContent = () => {
    const div = document.createElement("div")
  
    const title = document.createElement("h5")
    title.textContent = "Favorite Product"
    const productList = ProductList("favorite")
  
    div.append(title)
    div.append(productList)
  
    return div
  }
  
  const DetailContent = () => {
    const div = document.createElement("div")
    const text = document.createElement("p")
    text.textContent = "gaada product nya cuy"
  
    const linkBack = Link({ href: "#home", label: "Back to Home" })
  
    div.append(linkBack)
    div.append(text)
  
    if (state.detail.product) {
      text.textContent = "ini detail product " + state.detail.product.title
  
      const product = DetailProduct(state.detail.product)
      div.append(product)
    }
  
    return div
  }
  
  // ? logic to render content 
  const App = () => {
    const div = document.createElement("div")
    const navbar = NavBar()
    const homeContent = HomeContent()
    const favoriteContent = FavoriteContent()
    const detailContent = DetailContent()
  
    if (!state.hash.includes("#detail")) {
      div.append(navbar)
    }
  
    if (state.hash == "#home") {
      div.append(homeContent)
    } else if (state.hash == "#favorite") {
      div.append(favoriteContent)
    } else if (state.hash.includes("#detail")) {
      div.append(detailContent)
    } else {
      div.append(homeContent)
    }
  
    return div
  }
  
  const render = () => {
    const content = document.getElementById('content')
    const focusedElementId = document.activeElement.id 
    const focusedElementSelectionStart = document.activeElement.selectionStart
    const focusedElementSelectionEnd = document.activeElement.selectionEnd
    
    // instantiate element
    const app = App()
    // reset content when re-render
    content.innerHTML = ""
    // render element
    content.append(app)
  
    if (focusedElementId) {
      const focusedElement = document.getElementById(focusedElementId)
      focusedElement.focus()
      focusedElement.selectionStart = focusedElementSelectionStart
      focusedElement.selectionEnd = focusedElementSelectionEnd
    }
  }
  
  render()
  // konsep useEffect react
  onChangeState({
    hash: undefined,
    home: {
      inputValue: undefined,
      products: undefined,
      isLoading: undefined,
      errorMessage: undefined,
      page: undefined,
      totalPage: undefined,
      totalData: undefined,
    },
    favorite: {
      favoriteIds: undefined,
      isLoading: undefined,
      products: undefined,
      errorMessage: undefined,
    },
    detail: {
      productId: undefined,
      product: undefined,
      isLoading: undefined,
      errorMessage: undefined,
    }
  }, state)