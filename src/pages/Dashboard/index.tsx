import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  // armazena o dia selecionado
  const [selectedDate, setSelectedDate] = useState(new Date());

  // armazena o mês selecionado
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    // permitir que apenas os dias disponíveis possam ser clicados
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  // toda vez que o usuário trocar de mês, a aplicação deve chamar a api para consultar os dias disponíveis daquele mês
  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        // query params
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      // armazena o resultado em monthAvailability
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  // se currentMonth ou monthAvailability forem alteradas, os dias desabilitados serão recarregados
  const disabledDays = useMemo(() => {
    // filtra todos os dias que não estão disponíveis (available = false)
    // e para cada um pega o mês e ano (dos query params) e retorna a data no formato Date (ano, mês, dia)
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars1.githubusercontent.com/u/32341930?s=460&u=732a2e592797f578a4fccea4546c4cb60f40a6d0&v=4"
                alt="Yesmin Marie"
              />
              <strong>Yesmin Marie</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/32341930?s=460&u=732a2e592797f578a4fccea4546c4cb60f40a6d0&v=4"
                  alt="Yesmin Marie"
                />

                <strong>Yesmin Marie</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/32341930?s=460&u=732a2e592797f578a4fccea4546c4cb60f40a6d0&v=4"
                  alt="Yesmin Marie"
                />

                <strong>Yesmin Marie</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/32341930?s=460&u=732a2e592797f578a4fccea4546c4cb60f40a6d0&v=4"
                  alt="Yesmin Marie"
                />

                <strong>Yesmin Marie</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            /* impede que o usuário navegue por meses anteriores ao atual */
            fromMonth={new Date()}
            /* desabilita sábados e domingos */
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            /* adiciona a classe css "available", que insere o fundo cinza nos dias da semana que estão disponíveis */
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            /* mês selecionado */
            onMonthChange={handleMonthChange}
            /* dia selecionado */
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
