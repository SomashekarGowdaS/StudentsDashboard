import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import BarChart from 'react-bar-chart';

const StudentsList = (props) => {
    const { values } = props;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const [data, setData] = useState([]);

    useEffect(() => {
        getEachStudentMessages();
    }, [data])

    const getUniqueStudents = () => {
        const result = _.uniqBy(values, 'name');
        return result;
    }

    const getEachStudentMessages = () => {
        const arr = [];
        getUniqueStudents().forEach(stu => {
            const data = values.filter(val => {
                return val.name === stu.name;
            });
            arr.push({
                text: stu.name,
                value: data.length
            });
        });
        setData(arr);
    }

    const getPrivateMessages = () => {
        const result = values.filter(val => {
            return val.private;
        });
        return result;
    }

    const handleBarClick = (element, id) => {
        console.log(element, id);
    }

    return (
        <div className="row mt-3" >
            <div className="col-4">
                { values.length !== 0 && (
                    <div>
                        <h2> List of Students - { getUniqueStudents().length } </h2>
                        <ul className="list-group" >
                            { getUniqueStudents().map((value,i) => {
                            return <li className="list-group-item" key={value.id} > <Link to={ `/${value.id}` } > { value.name } </Link> </li>
                            }) }
                        </ul>
                    </div>
                ) }
            </div>
            <div className="col-8">
                { values.length !== 0 && (
                    <div>
                        <div className="row" >
                    <div className="col-6" >
                        <div className="card" >
                            <div className="card-body" >
                                <h3> Total Messages - { values.length } </h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-6" >
                        <div className="card" >
                            <div className="card-body" >
                                <h3> Private Messages - { getPrivateMessages().length } </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div style={{width: '50%'}}> 
                            <BarChart ylabel='Messages'
                            width={1800}
                            height={400}
                            margin={margin}
                            data={data}
                            onBarClick={handleBarClick}/>
                        </div>
                    </div>
                </div>
                    </div>
                ) }
            </div>
        </div>
    )
}

export default StudentsList