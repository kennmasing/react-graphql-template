import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

const Paginate = (props) => {


    const [buttons, setButtons] = useState(undefined)
    const [id, setId] = useState("btn-1")

    //on initial render, divide total to the given limit (e.g. 24 documents / 10 documents per page) to determine the number of buttons
    useEffect(() => {
        if (props.total) {
            //divide by the limit (i.e., 10) and use Math.ceil function to round a to the next largest whole number or integer. 
            let pages = Math.ceil(props.total / props.limit);
            return setButtons(pages)
        }
    }, [])


    //CREATE ACTUAL BUTTONS
    const createPaginationLinks = () => {
        //create an array that will hold the values for skip (e.g., if limit is 10 then skip is 0, 10, 20)
        let skipArr = [] //0, 10, 20
        for (let i = 0; i < buttons; i++) {
            skipArr.push(i * props.limit)
        }

        //set the page number that will appear in the button
        return skipArr.map((skip, index) => {
            index++

            //add classes to selected button
            let selectedClass = '';

            if (id.indexOf(`btn-${index}`) !== -1) {
                selectedClass = "btn btn-sm bg-secondary border-secondary text-white"
            }


            return <Button outline className={`${selectedClass}`} size="sm" id={`btn-${index}`} key={index} onClick={(e) => onClickHandler(e, skip)}>{index}</Button>
        })
    }

    //HANDLE CLICKS
    const onClickHandler = (e, skip) => {
        setId(e.target.id)
        createPaginationLinks()
        // return props.getDocuments(`&skip=${skip}`)
        return props.getDocuments({
            limit: props.limit,
            skip: skip
        })
    }

    return (
        <div>
            {createPaginationLinks()}
        </div>
    );
}

export default Paginate;