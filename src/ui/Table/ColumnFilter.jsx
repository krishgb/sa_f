export default function ColumnFilter({ column }) {
    const { filterValue, setFilter, Header } = column

    return (
        <input 
            style={{ color: 'black', width: '100%', padding:'0.2rem', paddingLeft: '0.3rem' }} 
            placeholder={"Search " + Header} 
            value={filterValue || ''} 
            onChange={(e) => setFilter(e.target.value)} 
            type='search'
        />
    )

}