import React from 'react'
import Cards from './Card'
import { Plus } from "lucide-react";
import { Button,Card, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { v4 as uuidv4 } from 'uuid'; 
import { useNotification } from '../NotificationProvider';


const CardList = ({ setLoading,item}) => {
  // console.log(item);
  const notify = useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [widgetData, setWidgetData] = useState({
    id:uuidv4(),
    name:'',
    information:'',
    checked: true,
    createdAt: new Date().toLocaleString()
  });

  const addWidget = useMutation(api.dashboard.add);
  const handleSubmit = (id) => {
    setLoading(true);
    
    addWidget({ id, widgetData })
      .then((response) => {
        setOpenModal(false);
        console.log('Widget added successfully:', response);
        notify('👌 Widget added successfully!',"success");
      })
      .catch((error) => {
        console.error('Error adding widget:', error);
        notify(' Something went wrong!',"error");
      })
      .finally(() => {
        setLoading(false);
      });
  };


  function onCloseModal() {
    setOpenModal(false);
    setWidgetData({});
  }
  return (
    <div className='flex flex-col justify-start w-full '>
      <div className='font-bold '>{item?.category}</div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 md:!px-0 w-full gap-3'>
        {item?.widgets.length>0 && item?.widgets.map((widget,index)=>(
          <Cards widget={widget} key={index}/>
        ))}
        <Card className="grid-cols-1 h-[15rem] bg-white flex justify-center items-center rounded-2xl">
      <div className="flex">
        <Button color="light" className="transition-none focus: outline-none" onClick={() => setOpenModal(true)}>
          <div className="flex justify-center items-center space-x-2">
            <span>
              <Plus />{" "}
            </span>
            <span> Add Widget</span>
          </div>
        </Button>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add widget to Category
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Widget Name" />
                </div>
                <TextInput
                  id="name"
                  placeholder="eg: Cloud Accounts"
                  name="name"
                  value={widgetData.name}
                  onChange={(event) => setWidgetData({...widgetData,name:event.target.value})}
                  required
                />
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="comment" value="Widget Information" />
                </div>
                <Textarea id="information" onChange={(event) => setWidgetData({...widgetData,information:event.target.value})} placeholder="Leave a comment..." required rows={4} />
              </div>
              
              <div className="w-full">
                <Button className="w-full flex justify-center items-center" onClick={()=>handleSubmit(item?._id)}>Submit</Button>
              </div>
              
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </Card>

      </div>
    </div>
  )
}

export default CardList
