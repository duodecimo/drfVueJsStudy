import 'dart:convert';

import 'package:flutter/material.dart';

import 'package:build_list_entity/api.dart';
import 'package:build_list_entity/user.dart';

void main() {
  runApp(MaterialApp(
    home: BuildListView(),
  ));
}

class BuildListView extends StatefulWidget {
  @override
  _BuildListViewState createState() => _BuildListViewState();
}

class _BuildListViewState extends State<BuildListView> {

  List<User> users = List<User>();

  _getUsers() {
    API.getUsers().then((response) {
      setState(() {
        print('TTT - $users');
        Iterable lista = json.decode(response.body)['results'];
        print(lista);
        users = lista.map((i) => User.fromJson(i)).toList();
        print(users[0].name);
      });
    });
  }

  _BuildListViewState() {
    _getUsers();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Lista de Usuários'),
      ),
      body: listaUsuarios(),
    );
  }

  listaUsuarios() {
    return ListView.builder(
        itemCount: users.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(
              '${users[index].id} - ${users[index].name} - ${users[index].email}',
              style: TextStyle(fontSize: 20.0, color: Colors.black),
            ),
          );
        });
  }
}
