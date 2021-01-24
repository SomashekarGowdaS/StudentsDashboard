import React,{ useState } from 'react'
import { Link } from 'react-router-dom'

const StudentDetails = (props) => {
    const { values } = props;
    const { id } = props.match.params

    const getMessages = () => {
        const user = values.find(val => {
            return val.id == id;
        });
        const result = values.filter(val => {
            return val.name == user.name;
        });
        return result;
    }


    return (
        <div className="row mt-3" >
            <div className="col-12" >
                <div className="card">
                    <div className="card-body">
                        <h2> Messages - { getMessages().length } </h2>
                        <ul className="list-group" >
                            { getMessages().map(val => {
                                return <li className="list-group-item" key={val.id} > <b>Message:</b> { val.message }, <b>Time:</b> { val.time } </li>
                            }) }
                        </ul>
                    </div>
                </div>
            </div>

            <p> <Link to='/' > back </Link> </p>
        </div>
    )
}

export default StudentDetails