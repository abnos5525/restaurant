import {Button} from "@mui/material";

const QtyInput = ({incrementQty, qty, decrementQty}) =>{
    return(
        <div className="flex flex-row w-50 h-10 relative mt-1 mx-3">
            <Button variant="contained" onClick={incrementQty} sx={{width:"10px",height:"20px",mt:1}} >
                +
            </Button>
            <input type="text" value={qty} className="text-center" disabled style={{width:"100px"}}/>
            <Button variant="contained" onClick={decrementQty} sx={{width:"10px",height:"20px",mt:1}}>
                -
            </Button>
        </div>
    )
}

export default QtyInput