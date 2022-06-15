export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  }

  const dotElement = <span class="dot"></span>

  const dotElements = () => {
    let dots = []
    if (props.value === 4 || props.value === 6) {
      dots.push(
        <>
          <div class="column">
            {dotElement}
            {dotElement}
            {props.value === 6 && dotElement}
          </div>
          <div class="column">
            {dotElement}
            {dotElement}
            {props.value === 6 && dotElement}
          </div>
        </>
      )
    } else if (props.value === 5) {
      dots.push(
        <>
          <div class="column">
            {dotElement}
            {dotElement}
          </div>
          <div class="column">{dotElement}</div>
          <div class="column">
            {dotElement}
            {dotElement}
          </div>
        </>
      )
    } else {
      for (let i = 1; i <= props.value; i++) {
        dots.push(dotElement)
      }
    }
    return dots
  }

  return (
    <div
      className={`die die-${props.value}`}
      style={styles}
      onClick={props.holdDice}
    >
      {dotElements()}
    </div>
  )
}
