import React, { useState, useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import styles from "../css/additional-styles/AnnotationPage.css?inline";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ImageList, Button, ImageListItem, ImageListItemBar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const itemData = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
    },
    {
      id: 5,
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
    },
    {
      id: 6,
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
    },
    {
      id: 7,
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      id: 8,
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      id: 9,
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
    },
    {
      id: 10,
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      id: 11,
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      id: 12,
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
    },
  ];
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="Image" style={{ width: '100%', height: 'auto' }} />
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
    },
  ];

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const rows = [
    {
      id: 1,
      image: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg',
      name: 'Image 1',
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 2,
      image: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg',
      name: 'Image 2',
      description: 'Consectetur adipiscing elit.',
    },
    // Add more rows as needed
  ];

  const fetchTasks = async () => {
    try {
      // const response = await fetch('/api/tasks')
      // const data = await response.json()
      setTasks(itemData)
    } catch (error) {
      return itemData;
      console.error('Error fetching tasks :', error);
    }
  }

  const openTask = (task) => {
    setSelectedTask(task)
  }

  const closeTask = () => {
    setSelectedTask(null);
  }

  const handleImageClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    fetchTasks();
  }, [])

  const handleCellClick = (params) => {

      const rowId = params.row.id;
      navigate(`/tasks/${rowId}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            {/* <WelcomeBanner /> */}

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                {/* Add view button */}
                {/* <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"> */}
                {/* <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16"> */}
                {/* <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" /> */}
                {/* </svg> */}
                {/* <span className="hidden xs:block ml-2">Add view</span> */}
                {/* </button>                 */}
              </div>
            </div>
            {/* <div className="grid grid-cols-4 gap-40"> */}
              <div style={{ height: 400, width: '100%' }}>
                
                <DataGrid rows={rows} columns={columns} pageSize={5} onCellClick={handleCellClick}/>
              </div>
            {/* </div> */}

          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;



