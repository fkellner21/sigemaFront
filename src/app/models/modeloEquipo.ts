//  @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     private int anio;

//     @Column(nullable = false)
//     private String modelo;

//     @Column(nullable = false)
//     private double capacidad;

//     @Column(nullable = false)
//     @ManyToOne
//     private Marca marca;

//     @OneToMany(mappedBy = "equipos")
//     private ArrayList<Equipo> equipos = new ArrayList<>();

//     @ManyToMany
//     private ArrayList<Repuesto> repuestos = new ArrayList<>();

    export class modeloEquipo{
        id!:number;
    }