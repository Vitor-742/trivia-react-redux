import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      rankingOrdenado: [],
    };
  }

  componentDidMount() {
    this.organizaRanking();
  }

  organizaRanking() { // obs: verificar se as infomacoes do player atual ja chegam aq no localStorage
    // apagar isso
    const help = [
      { name: 'maria', score: 10, picture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXk5ueutLersbTn6eqor7Lp6+y2u77h4+TIzM7N0dLR1NbU19mxt7q/xMbZ3N3c3+C6v8HCx8mJwGV6AAAFVUlEQVR4nO2d2XbjIAxAARmMd/v/f3YgSVs7kzY2CCMc3Zc50yffI7GDIgTDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMBcEQIt67NqmabtxEqAh9xdhAiBGO8vKoRy3f83S+b9fAYC6MapS8gknauxUviRAa/63+7E0jdC5vzEGEFZWv+k9JOVSF+sIYNWv4Vs5qkWUmau6kzv87o5NgWEEMG/yc03VF5equjvgd3MsLIywHBR0inPujz4ACLOzBa5RfV1KhwN1HyDoHacyFKEO0vNUYxGKdVgAC1I83MdsFOknKkRE0KPq3AZv0CZO0JFb4W/0EhlCF8SZcp5CG9UI71SWsGJMN7pSnHJ7/IqeUQylpDpFRclRj1qIKgKSoMvT3Cqv0QNSjjoMzSCihdDP3nLLvEDPeII0g1gjhtB1NvSCiNkKPTO9IOIKutVwbqEnoME2pDYmIqwpnsmt9MSEHEI3YHS5nTaARTdUA6klBuAnKbE0xVk2baG1iOoSGKqGUJpC/ObFCygN+kmaoZSEYog9oblTEdpYnFBn3d+GhEbEo4eF+1B0Nt0SjPc3w4FMV5OmK6W0DAbU5f0PPR3DNIOFVGQMdZ/GsKLT01zfMI0gG57IB2Tp9Q0vP1qkGvHpnCMC8n73F4RmbWlm3pLOzPv6q6dUK2BK50+X38VIM1woOkn6AbuJaXaECXU0n7Crf/2Tmeufrl3/hPQDTrkT3FSglaTi+rdNhB5wDemsnL7BvvVFLkmRb+7R2dBfgRlEUgunbz7gBi3eFVpKK8M10Fz9JjvexIaqINqLEpLdzB2UFxe0Vr7PIPSntF92+UOaaMXcCm+JfWFJ/xFp3NSmhIfAEKNYgqBTDN/RKEPw9iA/sOJAIYLBVSNkMVUjhD8zPdwY1VxWHR59dHZD+n3zS1ymHqrAQ38Y/B8Xxr1VlCpLdzXxF6CXPY6qGsqt2qbF8q7al1JDcSWiNmjR9L9Lqqq3ZVek84Ce7Muqgkr1y1hufm4AqLvFyEdhyFtpSGmWtr6I3gNnU09d29hbec/a/f9SeiuuKgagQW+5iKo386VnGzvMxvSPe6h9b+Zhse04uaZYrKn/8qmzg3mUnn0xEPoeR/Xz0tyaZe4PPoKXG5uhdwZ7pm3eVM62qwupLQxadNYFbk/l0u3gr/qhmahb6tvoflRuFU1n2QmykhrGQQbbrSxNUxOUdHOzQWGdrrnpagu0pqtaWDS9L0kzkgkkwDjvXeseoZKWxNYUiPZdQetg3No4e0lz/b5gd6Rj3mR1S/jAvd8DVKbL1ensLEiO4ThmcdTNOX43x/n8vRw9ps/PjeNybpcD4viufSRKndkcdXtegv5QnXawAWI+O4B3lGpPCaPucgTwTjWcEMaAivmIKJl64AguKI9G4t9Q0GNmP6+Y8jmUxrp8GIVKV11JZ22CK1SiVVXA2Xwq0lzaAKxS1hikUCQl6BQ7bEVigvjXp9CqreOB+0sY2EWCUcC80K8tmV50Dd5bb0hTMiGeHksR980WIlgl61LV10GgQilxSrKX+QLjHSbZRnjHIASRcAQlxvMTgkP9lujKCyPpHPVEPlXUub//PVXUHBztRWFKomqe6QIEo+p+p6rhhUzE/FQXIRgRRPRaF8kINUxVWhYd1QYqEtj+3UngmEh6yr0l9Icvc3/3fsJmp5CiQlkqgpYYBSVpaJrm/uojBA2JaepZJiLkET+0BSWpDHnFn6pybiICtocJ77C9IqR+XVEhDBkRi+poHMerLNLfoNlyfMzH+m3f0zhqCPbxVrAU6NTgZxiGYRiGYRiGYRiGYT6Uf/VaUTW8zb4SAAAAAElFTkSuQmCC' },
      { name: 'joao', score: 20, picture: 'data:image/png;base64,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' },
    ];
    const help1 = JSON.stringify(help);
    localStorage.setItem('ranking', help1);
    // ate aqui
    const rankingLS = JSON.parse(localStorage.getItem('ranking'));
    const rankingOrdenado = rankingLS.sort((a, b) => b.score - a.score);
    console.log(rankingOrdenado);
    this.setState({
      rankingOrdenado,
    });
  }

  render() {
    const { rankingOrdenado } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <section>
          {rankingOrdenado.map((player, index) => (
            <div key={ player.name }>
              <img alt="foto-player" src={ player.picture } />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </div>))}
        </section>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Início</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
