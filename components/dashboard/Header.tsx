import { cn } from "@/lib/utils";




interface props {
    setCategorie: (categorie: string) => void,
    selected: string
}

const Header = ({setCategorie, selected} : props ) => {
    const categories = ['all', 'pending', 'success', 'failed']


    return (
        <div className="flex w-full ">
            <div className=" hidden w-full justify-between p-5 sm:flex ">  
                {
                    categories.map((categorie, id) => ( 
                            <button key={id} className={cn("text-center w-full mx-2 bg-gray-300 p-2 hover:cursor-pointer", categorie == selected && " bg-green-400")}
                                onClick={() => setCategorie(categorie)}
                                > 
                                {categorie.toUpperCase()} 
                            </button>))
                }
            </div>

            <div className="w-full m-3 px-4 sm:hidden">
                    <select className="w-full h-12 bg-gray-200 text-center" onChange={(event) => (setCategorie(event.target.value))}>
                        {
                            categories.map((categorie) => <option key={categorie} value={categorie} className="text-center"> {categorie.toUpperCase()} </option>)
                        }
                    </select>
            </div>

        </div>
    )

}

export default Header;