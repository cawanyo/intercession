import { User } from 'lucide-react';


interface props {
    id: string,
    name: string,
    content?: string
}


const Comment = ({id, name, content}: props) => {
    return (
        <div className='flex gap-x-1 my-1'>
            <div className=' bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center'>
                <User size={12}/>
            </div>
            <div className=' bg-gray-200 border border-gray-400 rounded-2xl p-2 rounded-tl-none rounded-br-none w-full'>
                <p className=' text-[0.6em] text-blue-800 italic'>
                    {name}
                </p>
                <p className=' text-xs'>
                    {content}
                </p>
            </div>

        </div>
    )
}

export default Comment