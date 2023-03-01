/* Set up using Vue 3 */

/* import specific icons */
import {
  faArrowRight,
  faBars,
  faBriefcase,
  faCalendar,
  faClose,
  faCog,
  faDashboard,
  faDollar,
  faEllipsisV,
  faEllipsisVertical,
  faGavel,
  faHandcuffs,
  faHandshake,
  faHouse,
  faLock,
  faLockOpen,
  faPerson,
  faUser,
  faUserSecret,
  faUserShield,
  faUserTie,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faGoogle,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon as Fa } from "@fortawesome/vue-fontawesome";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* add icons to the library */
library.add(
  faUserSecret,
  faGithub,
  faGoogle,
  faFacebook,
  faInstagram,
  faTwitter,
  faArrowRight,
  faGavel,
  faHandshake,
  faUser,
  faBriefcase,
  faUsers,
  faHandcuffs,
  faHouse,
  faDollar,
  faLock,
  faCog,
  faLockOpen,
  faDashboard,
  faCalendar,
  faUserShield,
  faBars,
  faEllipsisVertical,
  faClose,
  faUserTie,
  faGavel,
  faPerson
);

// export the fontawesome icon component
export default Fa;
