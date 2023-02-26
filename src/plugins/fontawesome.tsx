/* Set up using Vue 3 */

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon as Fa } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUsers,
  faUserSecret,
  faArrowRight,
  faGavel,
  faHandshake,
  faUser,
  faBriefcase,
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
  faEllipsisV,
  faEllipsisVertical,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faGoogle,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
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
  faLock,faCog,faLockOpen,faDashboard,faCalendar,faUserShield,faBars,faEllipsisVertical,faClose
);

// export the fontawesome icon component
export default Fa;
