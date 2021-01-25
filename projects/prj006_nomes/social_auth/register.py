
from django.contrib.auth import authenticate
from authentication.models import User
import os
import random
from rest_framework.exceptions import AuthenticationFailed


def generate_username(name):

    username = "".join(name.split(' ')).lower()
    if not User.objects.filter(username=username).exists():
        return username
    else:
        random_username = username + str(random.randint(0, 1000))
        return generate_username(random_username)


def register_social_user(provider, user_id, email, name):

    print('Em register_social_user, parametros recebidos:')
    print('   provider: ', provider)
    print('   user_id: ', user_id)
    print('   email: ', email)
    print('   name: ', name)

    filtered_user_by_email = User.objects.filter(email=email)

    print('Users:')
    for usr in User.objects.all():
        print(usr)

    if filtered_user_by_email.exists():

        print('Após filtragem por email, verificado que o usuário já está registrado ...')

        print('Usuario encontrado: ', filtered_user_by_email[0])

        if provider == filtered_user_by_email[0].auth_provider:

            registered_user = authenticate(
                email=email, password=os.environ.get('SOCIAL_SECRET'))

            return {
                'username': registered_user.username,
                'email': registered_user.email,
                'tokens': registered_user.tokens()}

        else:
            raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

    else:

        print('Após filtragem por email, verificado que o usuário ainda não está registrado ... deve ser criado!')

        user = {
            'username': generate_username(name), 'email': email,
            'password': os.environ.get('SOCIAL_SECRET')}
        user = User.objects.create_user(**user)
        user.is_verified = True
        user.auth_provider = provider
        user.save()

        new_user = authenticate(
            email=email, password=os.environ.get('SOCIAL_SECRET'))
        return {
            'email': new_user.email,
            'username': new_user.username,
            'tokens': new_user.tokens()
        }
