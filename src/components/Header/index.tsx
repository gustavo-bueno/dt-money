import logoImg from '../../assets/logo.svg';
import { HeaderProps } from './interfaces';
import { Container, Content } from './styles';

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt-money" />
        <button onClick={onOpenNewTransactionModal} type="button">
          Nova transação
        </button>
      </Content>
    </Container>
  );
}
