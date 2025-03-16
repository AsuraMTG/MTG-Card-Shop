const Protected = () => {

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }
    
    return (
        <>
            <h1>Protected</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Protected