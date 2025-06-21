import "./styles.css";

type ButtonProps = {
  title: string;
  onPress: () => void;
  dark?: boolean;
}

export const Button = ({
  title, onPress, dark
}: ButtonProps) => (
    <button onClick={onPress} className={dark ? "btn_dark" : "btn"}>
        {title}
    </button>
  );
