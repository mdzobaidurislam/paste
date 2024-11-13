import React from 'react'
interface PasterProps {
    title?: string;
    content?: string;
}

const PasteForm: React.FC<{ paster: PasterProps }> = ({ paster }) => {
    return (
        <div>
            {/* <form onSubmit={handleSubmit}> */}
            <div className="mt-14">
                <input type="text" value={paster.title} className=" border-2 border-blue-100 rounded-md outline-0 text-white w-full mb-4 p-4 text-2xl  bg-transparent focus:bg-opacity-45 focus:bg-white transition-all" placeholder="Title" />
                <textarea placeholder="Add text..." className=" border-2 rounded-md w-full h-[50vh] p-2 text-white border-blue-100 outline-0 p-4 bg-transparent focus:bg-opacity-45 focus:bg-white transition-all ">
                    {paster.content}
                </textarea>
            </div>
            <div>
                <div className="flex justify-between text-white mt-8 items-end">
                    <div className='flex flex-col gap-4'></div>
                    <div>
                        <button type="submit" className='rounded-md bg-white text-gray-600 hover:bg-white hover:bg-opacity-25 hover:text-white transition-all p-2 px-4 cursor-default'>Create paste</button>
                    </div>
                </div>
            </div>
            {/* </form> */}
        </div>
    )
}
export default PasteForm