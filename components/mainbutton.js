import styles from './mainbutton.module.css';

export default function MainButton(props) {
  return <button onClick={props.onClick} className={styles.mainButton}>{props.content}</button>;
}
