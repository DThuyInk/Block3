import React from 'react';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
	const navigate = useNavigate();
	return (
		<nav className="navbar">
			<div className="navbar__left">
				<span className="navbar__brand">Name</span>
			</div>
			<div className="navbar__right">
				<FaHeart className="navbar__icon" title="Favourites" />
				<FaShoppingCart className="navbar__icon" title="Cart" />
				<FaUser
					className="navbar__icon"
					title="Login"
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/login')}
				/>
			</div>
		</nav>
	);
};

export default NavBar;
