import Colors from 'material-ui/lib/styles/colors'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Spacing from 'material-ui/lib/styles/spacing'
import zIndex from 'material-ui/lib/styles/zIndex'

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.blueGrey500,
    primary2Color: Colors.blueGrey700,
    primary3Color: Colors.blueGrey100,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.tealA100,
    accent3Color: Colors.lightBlue500,
    textColor: Colors.grey900,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey400,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.pinkA200
  }
}
