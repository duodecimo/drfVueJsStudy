import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<Entity> fetchEntity() async {
  final response = await http
      // .get(Uri.https('pratudo-backend.herokuapp.com/api/', 'entities/1/'));
      .get('https://pratudo-backend.herokuapp.com/api/entities/1');

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Entity.fromJson(jsonDecode(response.body));
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load entity');
  }
}

class Entity {
  final int id;
  final String name;
  final String email;

  Entity({this.id, this.name, this.email});

  factory Entity.fromJson(Map<String, dynamic> json) {
    return Entity(
      id: json['id'],
      name: json['name'],
      email: json['email'],
    );
  }
}

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  MyApp({Key key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  Future<Entity> futureEntity;

  @override
  void initState() {
    super.initState();
    futureEntity = fetchEntity();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Entidades de Saúde',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('Entidades de Saúde'),
        ),
        body: Center(
          child: FutureBuilder<Entity>(
            future: futureEntity,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Text(snapshot.data.name);
              } else if (snapshot.hasError) {
                return Text("${snapshot.error}");
              }

              // By default, show a loading spinner.
              return CircularProgressIndicator();
            },
          ),
        ),
      ),
    );
  }
}
