import { UserIcon,ShoppingCartIcon, InformationCircleIcon } from "@heroicons/react/24/solid";



export default function Navigation() {
    return (
        <div className="rounded-lg bg-black/50 backdrop-blur-md text-white sticky top-0.5 z-50">
            <div className="max-w-8xl px-4 py-4 flex item-center justify-between">
                <h1 className="text-xl font-bold">
                    057 skateboarding
                </h1>

                <div className="flex item-center gap-3">

        <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition flex items-center justify-center">
          <InformationCircleIcon className="w-5 h-5" />
        </button>

<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">
  <ShoppingCartIcon className="w-5 h-5" /> 
</button>
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">
  <UserIcon className="w-5 h-5" /> 
</button>
                </div>
            </div>
        </div>
    );
}