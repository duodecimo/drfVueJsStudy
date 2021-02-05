import 'package:http/http.dart' as http;

const baseUrl = "http://pratudo-backend.herokuapp.com/api/";

class API {
  static Future<http.Response> getUsers() {
    return http.get(Uri.https(baseUrl, 'entities/'));
  }
}
