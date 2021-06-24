const mainColors = {
  first: 'rgb(68, 74, 77)',//first: '#25274D',
  second: 'rgba(68,74,77,0.22)',//second: '#464866',
  third: 'rgb(68, 74, 77)',
  fourth: 'rgb(152, 198, 216)',
  fourthDarker: 'rgb(83,184,227)',
  fifth: '#29648A',
  fifthDarker: '#1e4c66',
  white: '#fff'
}

const theme = {
  background: 'rgb(4, 14, 18)',
  //WRAPPERS
  primaryWrapper: mainColors.first,
  secondaryWrapper: mainColors.second,
  thirdWrapper: mainColors.third,
  modalWrapper: 'rgb(100, 100, 100)', //TODOOO
  border: mainColors.fourth,
  borderHoover: mainColors.fourth,
  fieldBorder: mainColors.fourth,

  //TEXT
  headers: mainColors.fourth,
  headerDarker: mainColors.fifth,
  fieldLabel: mainColors.fourth,
  tableHeader: mainColors.fourthDarker,
  tableField: mainColors.fourth,
  input: mainColors.white,

  //FOOTER
  footer: mainColors.fourth,
  svg: mainColors.fifth,

  //HEADER
  navActive: mainColors.fourth,
  navNotActive: mainColors.fifthDarker,
  navInfo: mainColors.fourthDarker,

  //BUTTONS
  primaryButtonBackground: mainColors.fifthDarker,
  primaryButtonContent: mainColors.fourth,
  secondaryButtonContent: mainColors.white,

  selectBackground: 'rgba(57,57,57,0.21)',
  selectActive: 'rgb(68, 74, 77)',
  selectNotActive: 'rgb(68, 74, 77)',
};

export default theme;
