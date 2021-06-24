import AddCommentIcon from '@material-ui/icons/AddComment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import DetailsIcon from '@material-ui/icons/Details';
import LinkIcon from '@material-ui/icons/Link';

export const menuItems = [
  {
    icon: <DetailsIcon />,
    label: 'Wyświetl szczegóły',
    function: 'details',
  },
  {
    icon: <LinkIcon />,
    label: 'Wyświetl na stronie sklepu',
    function: 'showOnPortal',
  },
  {
    icon: <AddCommentIcon />,
    label: 'Dodaj komentarz',
    function: 'addComment',
  },
  {
    icon: <FavoriteIcon />,
    label: 'Dodaj do ulubionych',
    function: 'addFavourite',
  },
  {
    icon: <StarIcon />,
    label: 'Oceń',
    funtion: 'rate',
  },
];

export const portals = {
  DOBRE_ZIELE: {
    label: 'Dobre ziele',
    value: 'DOBRE_ZIELE',
  },
  UN_MATE: {
    label: 'Unmate',
    value: 'UN_MATE',
  },
  POYERBANI: {
    label: 'Poyerbani',
    value: 'POYERBANI',
  },
};

const portalOptions = Object.values(portals);

export const offersFilters = [
  {
    filterType: 'text',
    nameFilter: 'productName',
    nameTable: 'offer',
    label: 'Wyszukaj po nazwie',
  },
  {
    filterType: 'fromToNumber',
    nameFilter: 'amount',
    nameTable: 'offer',
    label: 'Waga',
  },
  {
    filterType: 'fromToNumber',
    nameFilter: 'price',
    nameTable: 'offer',
    label: 'Cena',
  },
  {
    filterType: 'select',
    nameFilter: 'portal',
    nameTable: 'offer',
    label: 'Portal',
    placeholder: 'Wszystkie portale',
    options: portalOptions,
  },
];

export const columns = [
  {
    title: 'Nazwa',
    fieldName: 'name',
    sorting: true,
  },
  {
    title: 'Waga',
    fieldName: 'amount',
    sorting: true,
  },
  {
    title: 'Cena',
    fieldName: 'price',
    sorting: true,
  },
  {
    title: 'Ocena',
    fieldName: 'rating',
    sorting: false,
  },
  {
    title: 'Portal',
    fieldName: 'portal',
    sorting: false,
  },
  {
    title: '',
    fieldName: 'action',
    sorting: false,
  },
];
