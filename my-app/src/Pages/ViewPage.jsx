import React, { useState, useEffect } from 'react'
import WatchCard from '../Components/WatchCard'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button } from 'reactstrap';
import 'react-tabs/style/react-tabs.css';
import './PagesStyling/ViewPageStyling.css'
import TicketCard from '../Components/TicketCard';
import TestHooks from '../Components/TestHooks';
import Chevron from '../Components/Chevron';

const ViewPage = () => {

    // tabs
    const [currentTab, setCurrentTab] = useState(1)
    const handleCurrentTab = (index) => setCurrentTab(index)



    // gets tickets from db when 'View Search Results' is clicked
    const [time, setTime] = useState('')
    const [customer, setCustomer] = useState([])

    const [isTCActive, setIsTCActive] = useState('active')
    // const [ticketHeight, setTicketHeight] = useState('0px')
    // const [tCRotation, setTCRotation] = useState('accordion_icon')

    const [areTabsVisible, setAreTabsVisible] = useState('none')

    const getTicketsFromDb = () => {
        setTime(new Date().toLocaleString())
        console.log('getTicketsFromDb firing')
        if (isTCActive === 'active') {
            setAreTabsVisible('inline')
            fetch('http://localhost:3001/tickets/getTickets')
                .then(data => data.json())
                .then(res => setCustomer(res.data))
        }

    }

    useEffect(() => getTicketsFromDb())


    const getTicketsFromDbForSelectedWatch = () => {
        setTime(new Date().toLocaleString())
        console.log('getTicketsFromDbForSelectedWatch firing')
        if (isTCActive === 'active') {
            setAreTabsVisible('inline')
            fetch('http://localhost:3001/tickets/getTickets')
                .then(data => data.json())
                .then(res => setCustomer(res.data.filter(ticket => ticket.watch_ordered == selectedWatch)))
        }

    }




    // collapsible WC component
    const [isActive, setIsActive] = useState('')
    const [watchHeight, setWatchHeight] = useState('0px')
    const [rotation, setRotation] = useState('accordion_icon')

    const toggleAccordion = () => {
        getWatchesFromDb()
        setIsActive(isActive === '' ? 'active' : '')
        setWatchHeight(isActive === 'active' ? '0px' : '1000px')
        setRotation(isActive === 'active' ? 'accordion_icon' : 'accordion_icon rotate')

    }

    const [watches, setWatches] = useState([]) // displays watches

    const getWatchesFromDb = () => {
        if (rotation === 'accordion_icon') {
            fetch('http://localhost:3001/watches/getWatches')
                .then(data => data.json())
                .then(res => setWatches(res.data))
                .then(console.log(watches))
        }
    }

    const [selectedWatch, setSelectedWatch] = useState('') // selects watches



    return (
        <div>
            <Button size="lg" outline color='info' className={`accordion ${isActive}`} onClick={toggleAccordion}>
                <p>view watches</p>
                <Chevron className={`${rotation}`} width={10} fill={"#777"} />
            </Button>

            {(isActive === 'active') ?
                watches.map((item, index) => {
                    return (<div style={{ maxHeight: `${watchHeight}` }} key={index}>
                        <WatchCard name={item.name} image={item.image} selectedWatch={selectedWatch} setSelectedWatch={setSelectedWatch} id={item._id} />
                    </div>)
                })
                :
                <div></div>
            }
            <br />
            <hr />
            <div className="TicketView">
                Watch Selected: {selectedWatch}
                <hr />
                <Button outline color='info' size='sm' onClick={getTicketsFromDb}>View All Tickets</Button>
                <Button outline color='info' size='sm' onClick={getTicketsFromDbForSelectedWatch}>View Results for Selected Watch</Button>
                        Last Updated: {new Date().toLocaleString()}


                {/* ///// tabs begin ///// */}
                <Tabs selectedIndex={currentTab} onSelect={handleCurrentTab} style={{ display: `${areTabsVisible}` }}>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab>Pending</Tab>
                        <Tab>Fulfilled</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>All Tickets</h2>


                        {(isTCActive === 'active') ?
                            customer.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <TicketCard
                                            id={item._id}
                                            // name to left of assigment is what name must be in child
                                            first_name={item.first_name}
                                            last_name={item.last_name}
                                            street={item.street}
                                            city={item.city}
                                            state={item.state}
                                            zip_code={item.zip_code}
                                            phone_number={item.phone_number}
                                            email={item.email}
                                            watch_ordered={item.watch_ordered}
                                            date_ordered={JSON.stringify(item.date_ordered)}
                                            fulfilled={JSON.stringify(item.fulfilled)}
                                            date_fulfilled={JSON.stringify(item.date_fulfilled)}
                                        />
                                    </div>)
                            })
                            :
                            <div></div>
                        }
                    </TabPanel>
                    <TabPanel>
                        <h2>Pending Tickets</h2>
                        {(isTCActive === 'active') ?
                            customer.filter(ticket => ticket.fulfilled === false).map((item, index) => {
                                return (
                                    <div key={index}>
                                        <TicketCard
                                            id={item._id}
                                            // name to left of assigment is what name must be in child
                                            first_name={item.first_name}
                                            last_name={item.last_name}
                                            street={item.street}
                                            city={item.city}
                                            state={item.state}
                                            zip_code={item.zip_code}
                                            phone_number={item.phone_number}
                                            email={item.email}
                                            watch_ordered={item.watch_ordered}
                                            date_ordered={item.date_ordered}
                                            fulfilled={item.fulfilled}
                                            date_fulfilled={item.date_fulfilled}
                                        />
                                    </div>)
                            })
                            :
                            <div>No Pending Tickets</div>
                        }
                    </TabPanel>
                    <TabPanel>
                        <h2>Fulfilled Tickets</h2>
                        {(isTCActive === 'active') ?
                            customer.filter(ticket => ticket.fulfilled === true).map((item, index) => {
                                return (
                                    <div key={index}>
                                        <TicketCard
                                            id={item._id}
                                            // name to left of assigment is what name must be in child
                                            first_name={item.first_name}
                                            last_name={item.last_name}
                                            street={item.street}
                                            city={item.city}
                                            state={item.state}
                                            zip_code={item.zip_code}
                                            phone_number={item.phone_number}
                                            email={item.email}
                                            watch_ordered={item.watch_ordered}
                                            date_ordered={item.date_ordered}
                                            fulfilled={item.fulfilled}
                                            date_fulfilled={item.date_fulfilled}
                                        />
                                    </div>)
                            })
                            :
                            <div>No Fulfilled Tickets</div>
                        }
                    </TabPanel>
                </Tabs>

            </div>

        </div >
    )

}

export default ViewPage