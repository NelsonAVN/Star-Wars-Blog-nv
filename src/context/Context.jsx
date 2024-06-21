import { useReducer, createContext } from "react"


const FavoriteContext = createContext (null);

const favoritesReducer = (state, action) =>{
    switch (action.type) {
        case 'Add' :
            if(state.find(selected => selected.name === action.payload.name)){
                return [...state]
              }
            return [...state,action.payload]

        case 'Delete' : 
        return state.filter(selected => selected.uid !== action.payload.uid)
        default : 
        return state   
    }
}


export function ContexProvider ({children}) {
    
  const [favorite, favoriteaction] = useReducer (favoritesReducer, [])
    return (
        <FavoriteContext.Provider value= {{favorite, favoriteaction}}>
            {children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteContext