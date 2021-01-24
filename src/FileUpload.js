import React,{ useState } from 'react'

const FileUpload = (props) => {
    const { onFileUpload, handleLogin, login } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFileChange = (e) => {
        onFileUpload(e.target.files[0]);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if( email === 'Somashekar' && password === '12345678' ) {
            handleLogin();
        }
    }

    return (
        <div>
            { login === false ? (
                <div >
                    <div className="row" style={{marginTop: '100px'}} >
                        <div className="card" style={{width: '100%'}} >
                            <div className="card-body" >
                                <h2> Login Form </h2>
                                <form onSubmit={ handleSubmit } >
                                    <label> Email: </label>
                                    <input type="text" className="form-control" value={email} onChange={ handleEmailChange } /> <br />
                                    <label> Password: </label>
                                    <input type="password" className="form-control" value={password} onChange={ handlePasswordChange } /> <br />
                                    <input type="submit" value="Login" className="btn btn-secondary" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="row text-center mt-3" >
                    <div className="card" style={{width: '100%'}} >
                        <div className="card-body" >
                            <input type="file" onChange={ handleFileChange } />
                        </div>
                    </div>
                </div>
            ) }
        </div>
    )
}

export default FileUpload