import random
import string
import secrets

DEFAULT_CHAR_STRING = string.ascii_lowercase + string.digits


def generate_random_string(chars=DEFAULT_CHAR_STRING, size=6):

    return ''.join(random.choice(chars) for _ in range(size))


def generate_uuid():

    part1 = secrets.token_hex(4)
    part2 = secrets.token_hex(2)
    part3 = secrets.token_hex(2)
    part4 = secrets.token_hex(2)
    part5 = secrets.token_hex(6)

    return part1 + "-" + part2 + "-" + part3 + "-" + part4 + "-" + part5


def calculate_price(start_time, end_time):
    # Calcular la diferencia en horas entre el tiempo de inicio y final
    time_difference = end_time - start_time
    hours = time_difference.total_seconds() / 3600  # Convertir segundos a horas
    # Calcular el precio multiplicando el número de horas por el precio por hora
    price = hours * 0.5  # 0.50 euros por hora
    return price
