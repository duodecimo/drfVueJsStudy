class Entity {
  final int id;
  final String name;
  final String email;

  Entity(this.id, this.name, this.email);
  factory Entity.fromMap(Map<String, dynamic> json) {
    return Entity(
      json['id'],
      json['name'],
      json['email'],
    );
  }
}
