import React, { Fragment } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {Witam
    Pani Małgorzato chcę zrezygnować z współpracy. Pomijam fakt, że nie mieliśmy gotowego systemu na integrację ale już na początku naszych rozmów mówiłem że długo nam to zajmie. Powodem rezygnacji jest sposób w jaki jesteśmy traktowani i obsługiwani. Żeby jakoś skontaktować się z Panem Kamilem i wegzekwować czegokolwiek od niego wymagało kilukrotnych telefonów do Pana Krzysztofa. Ja ze względu na obowiązki zawodowe musiałem przekazać nadzorowanie sprawy żonie i jej koleżance która pomaga w sklepie. Dziewczyny, zamiast czuć się "zaopiekowane" przez człowieka który powinien być pomocny i jako wdrożeniowiec-specjalista przewidywać problemy to jeszcze je generuje! Jak się nasłuchałem tego co się dzieje to mam wrażenie jakby się uczył robić synchroniację na naszej firmie!?! Przecież człowiek na takim stanowisku powinen wszystko 10x przemyśleć i dopytać zamiast na szybko i na "pałę" zaznaczać jak leci. Podczas pracy dzownią do mine dziewczyny że integracja nie może działać ponieważ trzeba aktualizować optimę, ja wydzwaniam do firmy która nas obsługuje i okazuje się że musimy dopłacić za aktualizację (której nie potrzebujemy ponad 1000zł). Dalej tracę czas, dzwonię do Pana Kamilia a on mi mówi że de facto do synchronizacji stanów magazynowych nie trzeba aktualizacji..... ręce mi opadają.... Od początku rozmów dawno dawno temu plus jeszcze wielokrotnie podczas rozmów kiedy jeszcze nadzorowałem sprawę mowiłem że "jest nam potrzebna tylko synchronizacja stanów magazynowych optima->shoper i shoper->optima". Co więcej, Pan Kamil zamiast to zrobić tak jak wiele razy powtażałem, zaznaczył nawet synchronizację opisów (!) gdzie optima tylko służy nam do księgowości. Wywaliło nam opisy, rozwaliło nam drzewo kategorii wraz z kategoriami liśćmi. Musieliśmy przyracać kopię zapasową z shopera, porobiły nam się duble zamówień ponieważ mamy to połaczone jeszcze z baselinkerem. Żona dostała szału (:/) bo masę pracy wkłada w sklep a gdyby nie to że klientki zaczęły do niej pisać że w sklepie nic nie można znaleźć to nawet by nie wiedziała że tak się wszystko posypało.... Następnego dnia podczas rozmowy (żony, koleżanki i Pana Kamila) nie potrafił nawet się przyznać do błędu, na pytanie dziewczyn kto temu jest winien stwierdził : "że nie może jednoznacznie stwierdzić"..... przecież to jest poniżej krytyki. Poczułem jakby traktował dziewczyny jak idiotki. No i teraz jeszcze finalna sprawa: od przedwczoraj miała działać synchronizacja, przemilczałem problemy bo najważniejsza dla mnie jest wygoda pracy dziewczyn. Od wczoraj jednak dalej coś nie działało i stany się nie aktualizowały dalej... koleżanka weszła do Państwa programu i okazało się, że nie była zaznaczony checkbox synchronizacji :X nie tak wyobrażam sobie współpracę i wdrażanie nowych rozwiązań. To jest droga przez mękę, masę naprawiania i poprawiania czyiś błędów i niedomówień. Nie chcę takiej wspópracy i chcę rozwiązania naszej umowy i zwrot kosztów. Nie wspominam nawet o naszy kosztach związanych z poprawianiem, stratą czasu i skargami od klientów. Nie chcę też więcej przerywać swojej pracy na rozwiązywanie kolejnych problemów. Proszę przesłać mi dokument rozwiązania umowy za porozumieniem storn jeśli macie Państwo taki szablon. 
    
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}))

export default function PersistentDrawerLeft() {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
  }

  return (
    <Fragment className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            MUSIC TRIPPER
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Strona Główna', 'Lista koncertów', 'Ulubione', 'Kontakt'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
          velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
          scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
          lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam
          dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus
          sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod
          lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in.
          In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod
          elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere
          sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </Fragment>
  )
}
