import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav, Modal, NavItem, Image } from 'react-bootstrap'
import logo from '../../common/images/logo_dark.svg'
import CreateAdvert from '../Adverts/Adverts-form/CreateAdvert-form.component'
import UserInfo from './UserInfo/UserInfo.component'
import { UserType } from '../../common/types/types'

interface IHeaderPropsType {
  user: UserType
  isAuthenticated: boolean
  isAdmin: boolean
}

const Header: React.FC<IHeaderPropsType> = React.memo(
  ({ user, isAuthenticated, isAdmin }) => {
    const [expanded, setExpanded] = useState(false)

    const [showAdsCreate, setshowAdsCreate] = useState(false)

    const handleCloseAdsCreate = () => setshowAdsCreate(false)
    const handleShowAdsCreate = () => setshowAdsCreate(true)

    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
      window.onresize = () => {
        const currentDocumentWidth = document.body.clientWidth
        if (currentDocumentWidth >= 1200) {
          setExpanded(false)
        }
      }
      const handleScroll = () => {
        const currentScrollPos = document.body.getBoundingClientRect().top
        setVisible(prevScrollPos < currentScrollPos)
        setPrevScrollPos(currentScrollPos)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollPos, visible])

    return (
      <>
        <Navbar
          collapseOnSelect={true}
          expanded={expanded}
          expand="xl"
          style={{ top: visible || expanded ? '0' : '-88px' }}
        >
          <Link
            onClick={() => setExpanded(false)}
            className="navbar-brand d-none d-xl-block"
            to="/home"
          >
            <Image
              src={logo}
              alt="Покровские дачи"
              width="180"
              height="60"
              className="d-inline-block align-top"
            />
          </Link>
          <Navbar.Toggle
            onClick={() => setExpanded(expanded ? false : true)}
            aria-controls="responsive-navbar-nav"
          />
          <div className="user-info-block" style={{ order: expanded ? 0 : 1 }}>
            <UserInfo user={user} isAuthenticated={isAuthenticated} />
          </div>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="navigation">
              <NavItem onClick={() => setExpanded(false)}>
                <NavLink to="/home">Главная</NavLink>
              </NavItem>
              <NavItem onClick={() => setExpanded(false)}>
                <NavLink to="/news">Новости</NavLink>
              </NavItem>
              <NavItem onClick={() => setExpanded(false)}>
                <NavLink to="/adverts">Объявления</NavLink>
              </NavItem>
              <NavItem onClick={() => setExpanded(false)}>
                <NavLink to="/documents">Документы</NavLink>
              </NavItem>
              <NavItem onClick={() => setExpanded(false)}>
                <NavLink to="/vote">Голосование</NavLink>
              </NavItem>
              <NavItem
                className="d-block d-xl-none"
                onClick={() => setExpanded(false)}
              >
                <NavLink to="/chat">Общий чат</NavLink>
              </NavItem>
              <NavItem
                className="d-block d-xl-none"
                onClick={() => setExpanded(false)}
              >
                <NavLink to="/messages">Личные сообщения</NavLink>
              </NavItem>
              <NavItem
                className="d-block d-xl-none"
                onClick={() => setExpanded(false)}
              >
                <NavLink to="/adverts/current_adverts">Мои объявления</NavLink>
              </NavItem>
              <NavItem
                as="a"
                className="d-block d-xl-none cursor-pointer"
                onClick={handleShowAdsCreate}
              >
                Создать объявление
              </NavItem>
              {isAdmin ? (
                <NavItem
                  className="d-block d-xl-none"
                  onClick={() => setExpanded(false)}
                >
                  <NavLink to="/admin/news">Комната админа</NavLink>
                </NavItem>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Modal show={showAdsCreate} onHide={handleCloseAdsCreate}>
          <Modal.Header closeButton>
            <Modal.Title>Создание объявления</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateAdvert handleCloseAdsCreate={handleCloseAdsCreate} />
          </Modal.Body>
        </Modal>
      </>
    )
  }
)

export default Header
