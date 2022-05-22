import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "./Table";
import "./Dashboard.css";
import Loader from "./Loader";
import empty from "../images/empty.svg";

const Dashboard = () => {
    const [loading, setLoading] = useState(1);
    const [ids, setIds] = useState([]);
    const [dates, setDates] = useState([]);
    const fetchUserInfo = async () => {
        const res = await fetch("/api/user/info");
        const data = await res.json();
        if (res.status === 200) {
            setIds(data.ids);
            setDates(data.dates);
        } else {
            window.alert(data.error);
        }
        setLoading(0);
    };
    useEffect(() => {
        fetchUserInfo();
    }, []);

    if (loading) return <Loader />;
    return (
        <div className="dashboard__container">
            {ids.length ? (
                <div className="dashboard__portfolios">
                    <h3>Your Portfolios</h3>
                    <hr />
                    <Table ids={ids} dates={dates} />
                </div>
            ) : (
                <div className="dashboard__empty">
                    <img src={empty} alt="empty" />
                    <h3>No portfolios</h3>
                    <Link to="/portfolio">Start Creating</Link>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
