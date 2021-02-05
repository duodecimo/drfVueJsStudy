import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'Entity.dart';

void main() => runApp(MyApp(entities: fetchEntitys()));

List<Entity> parseEntitys(String responseBody) {
  final parsed =
      json.decode(responseBody)['results'].cast<Map<String, dynamic>>();
  // final parsed = json.decode(responseBody)['entity'];
  return parsed.map<Entity>((json) => Entity.fromMap(json)).toList();
}

Future<List<Entity>> fetchEntitys() async {
  final response =
      await http.get('https://pratudo-backend.herokuapp.com/api/entities');
  if (response.statusCode == 200) {
    return parseEntitys(response.body);
  } else {
    throw Exception('Unable to fetch entities from the REST API');
  }
}

class MyApp extends StatelessWidget {
  final Future<List<Entity>> entities;
  MyApp({Key key, this.entities}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Entidades de Saúde',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home:
          MyHomePage(title: 'Entidades de Saúde home page', entities: entities),
    );
  }
}

class MyHomePage extends StatelessWidget {
  final String title;
  final Future<List<Entity>> entities;
  MyHomePage({Key key, this.title, this.entities}) : super(key: key);

  // final items = Entity.getEntitys();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("Entity Navigation")),
        body: Center(
          child: FutureBuilder<List<Entity>>(
            future: entities,
            builder: (context, snapshot) {
              if (snapshot.hasError) print(snapshot.error);
              return snapshot.hasData
                  ? EntityBoxList(items: snapshot.data)
                  :

                  // return the ListView widget :
                  Center(child: CircularProgressIndicator());
            },
          ),
        ));
  }
}

class EntityBoxList extends StatelessWidget {
  final List<Entity> items;
  EntityBoxList({Key key, this.items});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      itemBuilder: (context, index) {
        return GestureDetector(
          child: EntityBox(item: items[index]),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => EntityPage(item: items[index]),
              ),
            );
          },
        );
      },
    );
  }
}

class EntityPage extends StatelessWidget {
  EntityPage({Key key, this.item}) : super(key: key);
  final Entity item;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(this.item.name),
      ),
      body: Center(
        child: Container(
          padding: EdgeInsets.all(0),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                // Image.asset("assets/appimages/" + this.item.image),
                Expanded(
                    child: Container(
                        padding: EdgeInsets.all(5),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: <Widget>[
                            Text(this.item.name,
                                style: TextStyle(fontWeight: FontWeight.bold)),
                            Text(this.item.id.toString()),
                            Text("Name: " + this.item.name),
                            Text("E-mail: " + this.item.email),
                            RatingBox(),
                          ],
                        )))
              ]),
        ),
      ),
    );
  }
}

class RatingBox extends StatefulWidget {
  @override
  _RatingBoxState createState() => _RatingBoxState();
}

class _RatingBoxState extends State<RatingBox> {
  int _rating = 0;
  void _setRatingAsOne() {
    setState(() {
      _rating = 1;
    });
  }

  void _setRatingAsTwo() {
    setState(() {
      _rating = 2;
    });
  }

  void _setRatingAsThree() {
    setState(() {
      _rating = 3;
    });
  }

  Widget build(BuildContext context) {
    double _size = 20;
    print(_rating);
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      crossAxisAlignment: CrossAxisAlignment.end,
      mainAxisSize: MainAxisSize.max,
      children: <Widget>[
        Container(
          padding: EdgeInsets.all(0),
          child: IconButton(
            icon: (_rating >= 1
                ? Icon(
                    Icons.star,
                    size: _size,
                  )
                : Icon(
                    Icons.star_border,
                    size: _size,
                  )),
            color: Colors.red[500],
            onPressed: _setRatingAsOne,
            iconSize: _size,
          ),
        ),
        Container(
          padding: EdgeInsets.all(0),
          child: IconButton(
            icon: (_rating >= 2
                ? Icon(
                    Icons.star,
                    size: _size,
                  )
                : Icon(
                    Icons.star_border,
                    size: _size,
                  )),
            color: Colors.red[500],
            onPressed: _setRatingAsTwo,
            iconSize: _size,
          ),
        ),
        Container(
          padding: EdgeInsets.all(0),
          child: IconButton(
            icon: (_rating >= 3
                ? Icon(
                    Icons.star,
                    size: _size,
                  )
                : Icon(
                    Icons.star_border,
                    size: _size,
                  )),
            color: Colors.red[500],
            onPressed: _setRatingAsThree,
            iconSize: _size,
          ),
        ),
      ],
    );
  }
}

class EntityBox extends StatelessWidget {
  EntityBox({Key key, this.item}) : super(key: key);
  final Entity item;

  Widget build(BuildContext context) {
    return Container(
        padding: EdgeInsets.all(2),
        height: 140,
        child: Card(
          child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                // Image.asset("assets/appimages/" + this.item.image),
                Expanded(
                    child: Container(
                        padding: EdgeInsets.all(5),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: <Widget>[
                            Text("Id: " + this.item.id.toString()),
                            Text(this.item.name,
                                style: TextStyle(fontWeight: FontWeight.bold)),
                            Text(this.item.email),
                            RatingBox(),
                          ],
                        )))
              ]),
        ));
  }
}
