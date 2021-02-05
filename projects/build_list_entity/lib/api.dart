import 'package:http/http.dart' as http;


const baseUrl = "http://pratudo-backend.herokuapp.com/api/entities/";

class API {
  static Future getUsers() async {
    return await http.get(baseUrl);
  }
}