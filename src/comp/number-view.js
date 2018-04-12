const NumberView = (props) => {
    const intVal = Math.floor(props.value);
    const decVal = props.value - intVal;
    return `${intVal}.${Math.round(decVal * Math.pow(10, props.decimalPlaces || 5))}`;
}

export default NumberView;
