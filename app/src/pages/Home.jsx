import { Cards } from '../components/card/card'
import { Statistics } from '../components/card/Statistics'
import { Navbar } from "../components/navgation/Navbar"
import { Table } from '../components/table/Table'
import { api } from '../api/apiRoutes'
import { use, useEffect, useState } from 'react'

export const Home = () => {
const [data, setData] = useState(null);

useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await api.get('/'); 
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
},[])
 
    return(
        <div className="flex bg-gray-100">
            <div className="h-screen w-[360px] px-3 py-4 sticky top-0">
                <div className="w-full h-full bg-white rounded-md shadow-lg border border-gray-300">
                    <div className='flex justify-center items-center p-5'>
                        <p>Dashbroard Material Tailwind</p>
                    </div>
                    <div>
                        <ul className='flex flex-col p-5 w-full justify-center space-y-2'>
                            <li className='bg-gray-800 p-2 text-white rounded-md shadow-lg'><i class="fa-solid fa-house px-5"></i>Dashboard</li>
                            <li className=' p-2 rounded-md text-gray-400 hover:bg-gray-400 hover:text-white cursor-pointer'><i class="fa-solid fa-user px-5"></i>Profile</li>
                            <li className=' p-2 rounded-md text-gray-400 hover:bg-gray-400 hover:text-white cursor-pointer'><i class="fa-solid fa-table-list px-5"></i>Tables</li>
                            <li className=' p-2 rounded-md text-gray-400 hover:bg-gray-400 hover:text-white cursor-pointer'><i class="fa-solid fa-circle-exclamation px-5"></i>Notificaition</li>
                        </ul>
                    </div>
                </div>
           </div>
           <div className="w-full">
             <div className=" p-4">
                <Navbar/>
             </div>
            <Cards/>
            <Statistics/>
            <Table/>

           <div>
            <h1>Datos del backend:</h1>
            {data.length > 0 ? (
        <div>
          {data.map((item) => (
            <div key={item.id} style={{ marginBottom: '10px' }}>
              <p><strong>ID:</strong> {item.id}</p>
              <p><strong>Serial:</strong> {item.serial}</p>
              <p><strong>Creado:</strong> {new Date(item.createdAt).toLocaleString()}</p>
              <p><strong>Actualizado:</strong> {new Date(item.updatedAt).toLocaleString()}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
            </div>
           </div>
           
        </div>
    )
}