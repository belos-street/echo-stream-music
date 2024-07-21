import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
  icon: React.ReactNode
  name: string
  route: string
}

export const ListItem: React.FC<Props> = (props) => {
  const location = useLocation()
  const navigate = useNavigate()

  const setItemSelected = () =>
    props.route === location.pathname ? 'text-primary bg-neutral-950' : ''

  return (
    <li
      onClick={() => navigate(props.route)}
      className={`pl-16 py-4 hover:bg-neutral-950 transition duration-300 ease-in-out cursor-pointer ${setItemSelected()}`}
    >
      {props.icon}
      {props.name}
    </li>
  )
}
