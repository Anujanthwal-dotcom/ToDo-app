import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiWhiteBook } from 'react-icons/gi';
import { Link } from 'react-router-dom';
function Topbar() {


    return (
        <Navbar expand="lg" fixed='top' className='bg-white z-50'>
            <Container>
                <Navbar.Brand href="#home" className="fw-bold">
                    <div className="flex items-center gap-2">
                        <GiWhiteBook className="text-6xl text-red-500" />
                        <div className="flex items-center gap-2 text-5xl font-extrabold bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent tracking-wide">
                            <span className="text-4xl">TODO</span>
                        </div>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        
                            <Link to="/" className="navbar-brand">
                            <div className='font-bold text-gray-500 text-xl ml-3 rounded hover:bg-gray-100 px-6 py-2'>
                                Home
                            </div>
                            </Link>
                        

                        
                            <Link to="/about" className="navbar-brand">
                                <div className='font-bold text-gray-500 text-xl ml-3  rounded hover:bg-gray-100 px-6 py-2'>
                                    About Us
                                </div>
                            </Link>
                        
                    </Nav>
                    <div className="flex gap-4">
                        <Link to="/login">
                        <button className="rounded px-6 py-2 rounded-full border-2 border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-colors duration-300">
                            Login
                        </button>
                        </Link>
                        <Link to="/signup">
                        <button className="rounded px-6 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300">
                            Sign Up
                        </button>
                        </Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Topbar